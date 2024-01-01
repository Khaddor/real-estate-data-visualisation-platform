<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\VenteParRegionProvider;
use ApiPlatform\Metadata\Get;


#[ApiResource(
    formats: ['json', 'jsonld'],
    operations: [
    new Get(
        uriTemplate: 'ventes_par_region/{annee}',
        openapiContext: [
            'summary' => 'Récupère le nombre de ventes par région pour une année donnée',
            'description' => 'Récupère le nombre de ventes par région pour une année donnée',
            'parameters' => [
                [
                    'name' => 'annee',
                    'in' => 'path',
                    'required' => true,
                    'schema' => [
                        'type' => 'integer'
                    ],
                    'example' => '2023',
                    'description' => 'L\'année pour laquelle les données de ventes doivent être récupérées'
                ]
            ]
        ],
        provider: VenteParRegionProvider::class,
        
    )
])]

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
