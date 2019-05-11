<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Mail\ClientEvaluationMail;
use Illuminate\Support\Facades\Mail;
use App\Reservation;
use App\Mail\PartnerAndCarEvaluation;
use Carbon\Carbon;
class SendReviewsForm extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservation:sendReviewForm';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send the review form by mail to the client and partner when the ads period ends.';


    /**
     *  Users we want to send mails to
     * @var array
     */
    public $usersMail = [];

    /**
     *   The date/period
     * @var string
     */
    public $period;

    /**
     *   The date/period
     * @var string
     */
    public $message;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $reservations = \DB::table('ads')
        ->where("ads.status", "=" , 1)
        ->join('reservations', function ($join) {
            $join->on('ads.id', '=', 'reservations.ad_id')
            ->where("reservations.status", "=" , 1);
        })
        ->select("reservations.id")
        ->get();
        
        foreach ($reservations as $reservation) {
            $reservation = Reservation::find($reservation->id);
            //dd();
            if(
                Carbon::now()->greaterThan($reservation->ad->start_date)
                // Adding the condition for ads status status or -> 3
            ){
                // -> 3 Changing to ad'status to 3 or migrate the ad to history
                Mail::to($reservation->ad->user->email)->send(new ClientEvaluationMail($reservation));
                sleep(1);
                Mail::to($reservation->reservator->email)->send(new PartnerAndCarEvaluation($reservation));
            }
        }
        $this->info('Review mail have been sent to Users');
    }
}
