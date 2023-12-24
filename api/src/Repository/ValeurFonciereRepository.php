<?php

namespace App\Repository;

use App\Entity\ValeurFonciere;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\RequestStack;

class ValeurFonciereRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry, RequestStack $requestStack)
    {
        parent::__construct($registry, ValeurFonciere::class);
        $this->requestStack = $requestStack;
    }


    public function findByAveragePricePerMonth()
    {
        $queryBuilder = $this->createQueryBuilder('lv')
            ->select('DATE_FORMAT(lv.dateMutation, :format) as date,
            AVG(lv.valeurFonciere / lv.surface) as averagePrice')
            ->where('lv.typeMutation = :typeOfSale')
            ->andWhere('lv.typeLocal IN (:apartment, :house)')
            ->andWhere('lv.valeurFonciere > 0')
            ->andWhere('lv.surface > 0')
            ->setParameter('format', 'YYYY-MM')
            ->setParameter('typeOfSale', 0)
            ->setParameter('apartment', 'Appartement')
            ->setParameter('house', 'Maison')
            ->groupBy('date')
            ->orderBy('date');

        return $queryBuilder->getQuery()->getResult();

    }


  

}
