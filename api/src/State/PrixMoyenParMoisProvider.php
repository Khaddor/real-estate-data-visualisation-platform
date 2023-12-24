<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\PrixMoyenParMois;
use App\Repository\ValeurFonciereRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;



class PrixMoyenParMoisProvider implements ProviderInterface
{
    protected $ValeurFonciereRepository;

    public function __construct(ValeurFonciereRepository $ValeurFonciereRepository) {
        $this->ValeurFonciereRepository = $ValeurFonciereRepository;
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $results = $this->ValeurFonciereRepository->findByAveragePricePerMonth();
       
        $items = [];
        foreach ($results as $result)
        {
            $averagePricePerMonth = new PrixMoyenParMois();
            $averagePricePerMonth->setDate(\DateTime::createFromFormat('Y-m', $result['date']));
            $averagePricePerMonth->setPrixMoyen($result['averagePrice']);
            array_push($items, $averagePricePerMonth);
        }
        return $items;


    }
}
