<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Reservation;

class PartnerMustConfirmReservation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * The reservation instance.
     *
     * @var Reservation
     */
    public $reservation;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // When Client makes a reservation, Partner receives email with Client Ratings(Comments + Score) 
        return $this->view('email.partnerValidatesReservation');
    }
}
