<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\ORM\Mapping\Id;
use Symfony\Component\Validator\Constraints\Positive;
use Symfony\Component\Validator\Constraints\PositiveOrZero;

#[ApiResource]
#[Entity]
class ValeurFonciere
{
    #[Id]
    #[GeneratedValue]
    #[Column(type: 'integer')]
    protected $identifiant;

    #[Column(type: 'date')]
    protected $dateMutation;

    #[Column(type: 'string')]
    #[Positive]
    protected $typeMutation;

    #[Column(type: 'float')]
    #[PositiveOrZero]
    protected $valeurFonciere;

    #[Column(type: 'integer', length: 3)]
    #[Positive]
    protected $codeDepartement;

    #[Column(type: 'integer')]
    #[Positive]
    protected $codeTypeLocal;

    #[Column(type: 'string', nullable: true)]
    protected $typeLocal;

    #[Column(type: 'integer')]
    #[PositiveOrZero]
    protected $surface;



    public function getTypeLocal(): ?string
    {
        return $this->typeLocal;
    }

    public function setTypeLocal(?string $typeLocal): void
    {
        $this->typeLocal = $typeLocal;
    }

    public function getIdentifiant(): int
    {
        return $this->identifiant;
    }

    public function getDateMutation(): \DateTime
    {
        return $this->dateMutation;
    }

    public function getTypeMutation(): string
    {
        return $this->typeMutation;
    }

    public function getValeurFonciere(): float
    {
        return $this->valeurFonciere;
    }

    public function getCodeDepartement(): int
    {
        return $this->codeDepartement;
    }

    public function getCodeTypeLocal(): int
    {
        return $this->codeTypeLocal;
    }

    public function getSurface(): int
    {
        return $this->surface;
    }

    public function setDateMutation(\DateTime $dateMutation): void
    {
        $this->dateMutation = $dateMutation;
    }

    public function setTypeMutation(string $typeMutation): void
    {
        $this->typeMutation = $typeMutation;
    }

    public function setValeurFonciere(float $valeurFonciere): void
    {
        $this->valeurFonciere = $valeurFonciere;
    }

    public function setCodeDepartement(int $codeDepartement): void
    {
        $this->codeDepartement = $codeDepartement;
    }

    public function setCodeTypeLocal(int $codeTypeLocal): void
    {
        $this->codeTypeLocal = $codeTypeLocal;
    }

    public function setSurface(int $surface): void
    {
        $this->surface = $surface;
    }
}
