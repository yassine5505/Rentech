@component('mail::message')
# Bonjour
##Suite à votre participation à l'annonce, 
## Nous tenons a vous informer que la reservation associée à la voiture:
### {{ $reservation->ad->car->model . " " . $reservation->ad->car->brand }}
@if($whoCanceled === null)         
## a été annulé par le système pour cause d'inactivité/ expiration !
@else
## a été annulee par l'un des participants.       
@endif

##Nous vous invitions a [consulter votre profil](http://localhost:4200/profile) pour plus d'informations

Merci,<br>
**Rentech**
@endcomponent
