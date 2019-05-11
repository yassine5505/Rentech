<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Ad;
use App\Mail\CancelEmail;

class CancelExpiredAds extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ad:cancelexpired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancel the ads that expired and if there are reservations, it cancels them and send mail to users.';

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
        $ads = \DB::table('ads')
        // Ad which are reserved
        ->where(function($q) {
            $q->where('start_date', '<=', date("Y-m-d H:i:s") );
        })   
        ->where("status", "=" , 0)    
        ->orWhere("status", "=" , 1)
        ->select("id", "start_date",  "created_at", "status")
        ->get();
        
        foreach ($ads as $ad) {
            $ad = Ad::find($ad->id);
            if(
                Carbon::now()->greaterThan($ad->start_date)
                ){
                    
                // Checking if the ad has been booked and really has reservations
                if( $ad->status = 1 && count($ad->reservations) > 0 ) {    
                   // We get the last reservation and cancel it
                   $reservation = $ad->reservations->last();
                   $reservation->status = 2;

                   if($reservation->save()){     
                        //  We send emails to client and partner
                        Mail::to($reservation->reservator)->send(new CancelEmail($reservation));
                        Mail::to($reservation->ad->user->email)->send(new CancelEmail($reservation));
                        $this->info('Reservation #'.$reservation->id.' has been cancelled by the system !');
                    }
                }
                
                // We cancelled the Ad (ad->status = 3)
                $ad->status = 3;
                $ad->save();
                
                // Here we can add custom mail
                // to notify the partner that his Ad has been cancelled by the system
                $this->info('Ad #'.$ad->id.' has been cancelled by the system !');
            }
           
        }

    }
}
