@component('mail::message')
# Bonjour

###Nous esperons que vous avez eu une belle experience en utilisant notre plateforme.

@component('mail::panel')
    On vous envoie cet email suite a votre derniere reservation.
    Pour ameliorer notre systeme ainsi que votre profil, on vous suggere d'evaluer votre experience avec **{{ $reservation->ad->user->name }}**

@endcomponent

@component('mail::button', ['color' => 'red', 'url' => 'http://localhost:4200/score/evaluer;reservationCode='.$reservation->id.';carCode='.$reservation->ad->car->id.';partnerCode='.$reservation->ad->car->user->id ])
    Evaluer le partenaire
@endcomponent

Merci,<br>
Rentech
@endcomponent
