@component('mail::message')
# Bonjour
##Suite a votre participation a l'annonce: 

## Nous tenons a vous informer que la reservation associee a la voiture:
### {{ $reservation->ad->car->model . " " . $reservation->ad->car->brand }}
## A ete annulee par l'un des participants

##Nous vous invitions a [consulter votre profil](http://localhost:4200/profile) pour plus d'informations

Merci,<br>
**Rentech**
@endcomponent
