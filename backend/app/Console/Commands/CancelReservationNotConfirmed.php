<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use App\Reservation;
use App\Mail\CancelEmail;

class CancelReservationNotConfirmed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservation:cancel_after_2_hours';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This Job is used to cancel automatically reservation that aren\'t validated after 2 hours.' ;

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
        // Get all the reservations created 2hours ago and not confirmed
        $reservations = \DB::table('ads')
        ->where("ads.status", "=" , 1)
        ->join('reservations', function ($join) {
            $join->on('ads.id', '=', 'reservations.ad_id')
            ->where("reservations.status", "=" , 0);
        })
        ->select("reservations.id", "reservations.created_at")
        ->get();

        
        foreach ($reservations as $reservation) {
            if(Carbon::now()->subHours(2)->greaterThan($reservation->created_at)){
                $reservation = Reservation::find($reservation->id);
                // Status = 2 for cancelled reservations    
                $reservation->status = 2;
                $reservation->ad->status = 0;
                $reservation->ad->save();
                
                if($reservation->save()){     
                    //  We send emails to client and partner
                    Mail::to($reservation->reservator)->send(new CancelEmail($reservation));
                    Mail::to($reservation->ad->user->email)->send(new CancelEmail($reservation));
                }
                $this->info('Expired reservation not confirmed have been cleaned !');
            }
            continue;
        }
        
    }
}
