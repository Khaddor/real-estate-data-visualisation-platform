<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\ValeurFonciereRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use App\Entity\NombreVenteRegion;



class VenteParRegionProvider implements ProviderInterface
{
    protected $ValeurFonciereRepository;

    public function __construct(ValeurFonciereRepository $ValeurFonciereRepository) {
        $this->ValeurFonciereRepository = $ValeurFonciereRepository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $results = $this->ValeurFonciereRepository->findVentesParRegion($uriVariables['annee']);
        print_r($results);

        $items = [];
        foreach ($results as $result)
        {
            $salesByRegion = new NombreVenteRegion();
            // Nettoyer la propriété "region" en supprimant les sauts de ligne
            $result['region'] = str_replace(["\r", "\n"], '', $result['region']);
            $salesByRegion->setRegion($result['region']);
            
            $salesByRegion->setNombreVente($result['nombreVente']);
            array_push($items, $salesByRegion);
        }
        
        return $items;




    }
}
