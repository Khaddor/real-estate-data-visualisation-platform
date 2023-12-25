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
            ->setParameter('typeOfSale', 'Vente')
            ->setParameter('apartment', 'Appartement')
            ->setParameter('house', 'Maison')
            ->groupBy('date')
            ->orderBy('date');

        return $queryBuilder->getQuery()->getResult();

    }

    public function findNombreVenteParDate(string $type, string $startDate, string $endDate)
    {
        $format = '';
        switch ($type)
        {
            case 'jour':
                $format = 'YYYY-MM-DD';
                break;
            case 'mois':
                $format = 'YYYY-MM';
                break;
            case 'année':
                $format = 'YYYY';
                break;
        }
        $queryBuilder = $this->createQueryBuilder('lv')
            ->select('DATE_FORMAT(lv.dateMutation, :format) as date,
            COUNT(lv.typeMutation) as nombreVente')
            ->where('lv.typeMutation = :typeOfVente')
            ->andWhere('lv.dateMutation BETWEEN :debut AND :fin')
            ->setParameter('format', $format)
            ->setParameter('typeOfVente', 'Vente')
            ->setParameter('debut', $startDate)
            ->setParameter('fin', $endDate)
            ->groupBy('date')
            ->orderBy('date');
        return $queryBuilder->getQuery()->getResult();
    }

    public function findVentesParRegion(int $year)
    {
        $queryBuilder = $this->createQueryBuilder('lv')
            ->select('lv.region as region,
            COUNT(lv.typeMutation) as nombreVente')
            ->where('DATE_FORMAT(lv.dateMutation, :format) = :year')
            ->andWhere('lv.typeMutation = :typeOfMutation')
            ->setParameter('format', 'YYYY')
            ->setParameter('year', $year)
            ->setParameter('typeOfMutation', 'Vente')
            ->groupBy('region')
            ->orderBy('nombreVente');
        return $queryBuilder->getQuery()->getResult();
    }




  

}
