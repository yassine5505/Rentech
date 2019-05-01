@component('mail::message')
# Bonjour, {{ $reservation->ad->user->name}}
## Un client vient de reserver votre voiture: 
    {{ $reservation->ad->car->brand ."  " . $reservation->ad->car->model }}
@component('mail::button', ['url' => 'http://localhost:4200/profile/reservations;id='.$reservation->id])
    Confirmer Reservation
@endcomponent

Merci,<br>
{{ config('app.name') }}
@endcomponent
