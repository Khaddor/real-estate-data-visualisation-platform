<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\PrixMoyenParMoisProvider;

#[ApiResource(operations: [
    new GetCollection(
        uriTemplate: 'prix_moyen_par_mois',
        provider: PrixMoyenParMoisProvider::class,
        description: 'Récupère le prix moyen par mètre carré pour un mois donné'
    )
])]
class PrixMoyenParMois
{

    protected \DateTime $date;


    protected float $prixMoyen;

    public function getDate(): \DateTime
    {
        return $this->date;
    }

    public function getPrixMoyen(): float
    {
        return $this->prixMoyen;
    }

    public function setDate(\DateTime $date): void
    {
        $this->date = $date;
    }

    public function setPrixMoyen(float $prixMoyen): void
    {
        $this->prixMoyen = $prixMoyen;
    }
}
