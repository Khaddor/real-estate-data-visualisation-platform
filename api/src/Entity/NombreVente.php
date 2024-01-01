<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\NombredeVenteProvider;
use ApiPlatform\Metadata\Get;



#[ApiResource(
    formats: ['json', 'jsonld'],
    operations: [
        /*
    new GetCollection(
        uriTemplate: 'nombre_vente',
        provider:  NombredeVenteProvider::class,
        description: 'Récupère le nombre de ventes entre entre 2018 - 2023',
        openapiContext: [
            'summary' => 'Récupère le nombre de ventes par mois entre 2018 - 2023 sans pagination',
            'description' => 'Récupère le nombre de ventes par mois  entre 2018 - 2023 sans pagination',
        ],
        //paginationEnabled: false,
    ),
    */
    new Get(
        uriTemplate: 'nombreVentes/{type}/{debut}/{fin}',
        openapiContext: [
            'summary' => 'Récupère le nombre de ventes entre deux dates (jour, mois, année)',
            'description' => 'Récupère le nombre de ventes entre deux dates (jour, mois, année)',
            'parameters' => [
                [
                    'name' => 'type',
                    'in' => 'path',
                    'required' => true,
                    'schema' => [
                        'type' => 'string',
                        'enum' => ['jour', 'mois', 'année']
                    ],
                    'description' => 'La manière dont le nombre de ventes doit être regroupé'
                ],
                [
                    'name' => 'debut',
                    'in' => 'path',
                    'required' => true,
                    'schema' => [
                        'type' => 'string',
                        'format' => 'date',
                    ],
                    'example' => '2018-01-01',
                    'description' => 'La date de début de la plage de dates, au format "AAAA-MM-JJ"'
                ],
                [
                    'name' => 'fin',
                    'in' => 'path',
                    'required' => true,
                    'schema' => [
                        'type' => 'string',
                        'format' => 'date',
                    ],
                    'example' => '2023-12-25',
                    'description' => 'La date de fin de la plage de dates, au format "AAAA-MM-JJ"'
                ]
                ],

        ],
        description: 'Récupère le nombre de ventes entre deux dates (jour, mois, année)',
        provider:  NombredeVenteProvider::class,
    ),
    
])]

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
