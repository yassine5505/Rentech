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
        // Ad which are reserved
        ->where("ads.status", "=" , 1)
        ->join('reservations', function ($join) {
            $join->on('ads.id', '=', 'reservations.ad_id')
            ->where("reservations.status", "=" , 1);
        })
        ->select("reservations.id")
        ->get();
        
        foreach ($reservations as $reservation) {
            $reservation = Reservation::find($reservation->id);
            if(
                Carbon::now()->greaterThan($reservation->ad->start_date)
            ){
                Mail::to($reservation->ad->user->email)->send(new ClientEvaluationMail($reservation));
                // Mark the ad as finished (status == 2) 
                $reservation->ad->status = 2;
                $reservation->ad->save();
                Mail::to($reservation->reservator->email)->send(new PartnerAndCarEvaluation($reservation));
                $this->info('Review mail have been sent to Users');
            }
        }
    }
}
