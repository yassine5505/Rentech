<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendReviewsForm extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:sendReviewForm';

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
        ->join('reservations', 'ads.id', '=', 'reservations.ad_id')
        ->where("reservations.status", "=" , 1)
        ->select("reservations.id", "reservations.reservator_id", "ads.user_id","ads.start_date", "ads.end_date")
        ->get();
        
        dd($reservations);
    }
}
