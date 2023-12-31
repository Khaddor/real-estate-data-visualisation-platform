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
        $type = isset($uriVariables['type']) ? $uriVariables['type'] : 'mois';
        $debut = isset($uriVariables['debut']) ? $uriVariables['debut'] : '2018-01-01';
        $fin = isset($uriVariables['fin']) ? $uriVariables['fin'] : '2023-12-31';


        $results = $this->ValeurFonciereRepository->findNombreVenteParDate($type, $debut, $fin);
        $format = '';
        switch ($type)
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
