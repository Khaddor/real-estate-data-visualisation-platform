<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;

#[ApiResource]
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
