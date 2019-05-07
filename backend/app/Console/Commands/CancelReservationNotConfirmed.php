<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Reservation;

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
            $expDate = Carbon::now()->subHours(2);
            $join->on('ads.id', '=', 'reservations.ad_id')
            ->where("reservations.status", "=" , 0)
            ->where('reservations.created_at', '<', $expDate);
            /*->whereRaw('DATEDIFF(? ,  reservations.created_at ) > 2')
            ->setBindings([]);*/
            
        })
        ->select("reservations.id")
        ->get();
        foreach ($reservations as $reservation) {
            $reservation = Reservation::find($reservation->id);
            
            $this->info(var_dump($reservation));
            $reservation->status = 0;
            $reservation->ad->status = 0;
            $reservation->ad->save();
            $reservation->save();
            $this->info('Expired reservation not confirmed have been cleaned !');
        }
        
    }
}
