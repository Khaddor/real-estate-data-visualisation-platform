<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;


#[ApiResource]
class NombreVenteRegion
{
    // la region
    protected string $region;

    // le nombre de vente dans la region
    protected int $nombreVente;

   
    // getters et setters

    public function getRegion(): string
    {
        return $this->region;
    }

    public function setRegion(string $region): NombreVenteRegion
    {
        $this->region = $region;
        return $this;
    }

    public function getNombreVente(): int
    {
        return $this->nombreVente;
    }

    public function setNombreVente(int $nombreVente): NombreVenteRegion
    {
        $this->nombreVente = $nombreVente;
        return $this;
    }
}
