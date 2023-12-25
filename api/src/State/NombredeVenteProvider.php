<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Repository\ValeurFonciereRepository;
use DateTime;
use App\Entity\NombreVente;




class NombredeVenteProvider implements ProviderInterface
{
    protected $ValeurFonciereRepository;

    public function __construct(ValeurFonciereRepository $ValeurFonciereRepository) {
        $this->ValeurFonciereRepository = $ValeurFonciereRepository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        
        $results = $this->ValeurFonciereRepository->findNombreVenteParDate($uriVariables['type'], $uriVariables['debut'], $uriVariables['fin']);
        $format = '';
        switch ($uriVariables['type'])
        {
            case 'jour':
                $format = 'Y-m-d';
                break;
            case 'mois':
                $format = 'Y-m';
                break;
            case 'année':
                $format = 'Y';
                break;
        }
        $items = [];
        foreach ($results as $result)
        {
            $numberSalesByDate = new NombreVente();
            $numberSalesByDate->setDate(\DateTime::createFromFormat($format, $result['date']));
            $numberSalesByDate->setNombreVente($result['nombreVente']);
            array_push($items, $numberSalesByDate);
        }
        return $items;



    }
}
