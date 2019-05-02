@component('mail::message')
# Bonjour

###Nous vous remercions d'avoir choisi notre plateforme

@component('mail::panel')
    Vous recevez ce mail suite a votre derniere reservation.
    Informations sur le client **{{ $reservation->reservator->name }}**
    |               |              
    | ------------- |:-------------:|
    | Email           | {{ $reservation->reservator->email }} |
    | Telephone      | {{ $reservation->reservator->telephone }}      |
    | Adresse | {{ $reservation->reservator->address }}      |
@endcomponent

@component('mail::button', ['color' => 'red', 'url' => 'http://localhost:4200/profile'])
    Voir l'annonce
@endcomponent

Merci,<br>
Rentech
@endcomponent
