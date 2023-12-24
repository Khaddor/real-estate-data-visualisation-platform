<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231224194721 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE valeur_fonciere_identifiant_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE valeur_fonciere (identifiant INT NOT NULL, date_mutation DATE NOT NULL, type_mutation INT NOT NULL, valeur_fonciere DOUBLE PRECISION NOT NULL, code_departement INT NOT NULL, code_type_local INT NOT NULL, surface INT NOT NULL, PRIMARY KEY(identifiant))');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE valeur_fonciere_identifiant_seq CASCADE');
        $this->addSql('DROP TABLE valeur_fonciere');
    }
}
