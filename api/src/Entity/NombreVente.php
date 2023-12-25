<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;


#[ApiResource]
class NombreVente
{
    // la date soit par mois soit année par semaine
    protected \DateTime $date;

    // le nombre de vente
    protected int $nombreVente;


    // getters et setters
    public function getDate(): \DateTime
    {
        return $this->date;
    }

    public function setDate(\DateTime $date): NombreVente
    {
        $this->date = $date;

        return $this;
    }

    public function getNombreVente(): int
    {
        return $this->nombreVente;
    }

    public function setNombreVente(int $nombreVente): NombreVente
    {
        $this->nombreVente = $nombreVente;

        return $this;
    }
    
   
}
