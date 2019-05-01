@component('mail::message')
# Bonjour, {{ $reservation->ad->user->name}}
## Un client vient de reserver votre voiture: 
###{{ $reservation->ad->car->brand ."  " . $reservation->ad->car->model }}

@component('mail::panel')
    Commentaires sur le client
    @component('mail::table')
    |Commentaire               |Score          |
    | -------------            |:-------------:|
    @foreach($reservation->ad->user->reviews as $r)
    |{{$r->comment}}          | {{$r->amount}}|
    @endforeach

    @endcomponent
@endcomponent


@component('mail::button', ['color' => 'red', 'url' => 'http://localhost:4200/profile/reservations;id='.$reservation->id])
    Confirmer Reservation
@endcomponent

Merci,<br>
##RENTECH
@endcomponent