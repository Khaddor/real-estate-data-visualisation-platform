<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\State\PrixMoyenParMoisProvider;

#[ApiResource(
    formats: ['json', 'jsonld'],
    operations: [
    new Get(
        uriTemplate: 'prix_moyen_par_mois',
        provider: PrixMoyenParMoisProvider::class,
        description: 'Récupère le prix moyen mensuel par mètre carré',
        openapiContext: [
            'summary' => 'Récupère le prix moyen mensuel par mètre carré',
            'description' => 'Récupère le prix moyen mensuel par mètre carré',
        ],
        paginationEnabled: false,
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
