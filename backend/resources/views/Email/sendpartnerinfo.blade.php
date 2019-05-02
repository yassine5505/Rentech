@component('mail::message')
# Bonjour

###Nous vous remercions d'avoir choisi notre plateforme

@component('mail::panel')
    Vous recevez ce mail suite a votre derniere reservation.
    Informations sur le partenaire **{{ $reservation->ad->user->name }}**
    |               |              
    | ------------- |:-------------:|
    | Email           | {{ $reservation->ad->user->email }} |
    | Telephone      | {{ $reservation->ad->user->telephone }}      |
    | Adresse | {{ $reservation->ad->user->address }}      |
@endcomponent

@component('mail::button', ['color' => 'red', 'url' => 'http://localhost:4200/profile'])
    Voir l'annonce
@endcomponent

Merci,<br>
Rentech
@endcomponent
