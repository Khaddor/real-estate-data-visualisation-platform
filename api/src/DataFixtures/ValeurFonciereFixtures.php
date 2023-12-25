<?php

namespace App\DataFixtures;

use App\Entity\ValeurFonciere;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class ValeurFonciereFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        ini_set('memory_limit', '8192M');
        // $file = fopen('https://static.data.gouv.fr/resources/demandes-de-valeurs-foncieres/20231010-093059/valeursfoncieres-2022.txt', 'r');

        $fileRegions = fopen(dirname(__DIR__) . '/Data/regions.txt',  'r');

        // skip first line
        fgets($fileRegions);
        while (($lineRegion = fgets($fileRegions)) !== false) {
            $values = explode(',', $lineRegion);
            $regionMapping[strval($values[0])] = str_replace("\r\n", "", $values[2]);
        }

        // print $regionMapping[];
        foreach ($regionMapping as $key => $value) {
            echo "$key => $value\n";
        }
      


        $output_dir = dirname(__DIR__) . '/Data';

        
        $files = [
            "2023s1" => "https://static.data.gouv.fr/resources/demandes-de-valeurs-foncieres/20231010-093302/valeursfoncieres-2023.txt",
            "2022" => "https://static.data.gouv.fr/resources/demandes-de-valeurs-foncieres/20231010-093059/valeursfoncieres-2022.txt",
            "2021" => "https://static.data.gouv.fr/resources/demandes-de-valeurs-foncieres/20231010-092719/valeursfoncieres-2021.txt",
            "2020" => "https://static.data.gouv.fr/resources/demandes-de-valeurs-foncieres/20231010-092355/valeursfoncieres-2020.txt",
            "2019" => "https://static.data.gouv.fr/resources/demandes-de-valeurs-foncieres/20231010-092100/valeursfoncieres-2019.txt",
            "2018s2" => "https://static.data.gouv.fr/resources/demandes-de-valeurs-foncieres/20231010-091504/valeursfoncieres-2018-s2.txt",
        ];

        // telechargement des fichiers si ils n'existent pas
        foreach ($files as $file => $url) {
            $outName = "$output_dir/$file.txt";
        
           if(!file_exists($outName)){
            // telechargement du fichier
            $res = file_put_contents($outName, file_get_contents($url));
            if($res === false){
                echo "erreur lors du telechargement du fichier $outName\n";
                continue;
            }else{
                echo "Le fichier $outName a été téléchargé avec succès.\n";
            }
           }else{
               echo "le fichier $outName existe deja\n";
               continue;
           }
        }

        // ouverture des fichiers et insertion en base de données
        foreach($files as $file => $_){
           $outName = "$output_dir/$file.txt";

           $maxInsertions= 10000;
           $fp = fopen($outName, 'r'); 


           // insertion en base de données 
           $numberItems = 0;
           $numberLine = 0;

           echo "debut de l'insertion du fichier $outName ...\n";
           while (($data = fgetcsv($fp, 1000, "|")) !== false) {
            if ($numberLine !== 0) {

                if ($data[8] == "" || $data[10] == "" || $data[18] == ""  || $data[38] == "" || $data[36] == "") {
                    continue;
                }
    
                // Pas de surface. Non exploitable
                if ($data[38] == "0") {
                    continue;
                }

                if($numberItems >= $maxInsertions){
                    break;
                }

                $valeurFonciere = new ValeurFonciere();
                $valeurFonciere->setDateMutation(\DateTime::createFromFormat('d/m/Y', $data[8]));
                $valeurFonciere->setTypeMutation($data[9]);
                $valeurFonciere->setValeurFonciere(floatval(str_replace(',', '.', $data[10])));
                $valeurFonciere->setSurface(intval($data[38]));
                $valeurFonciere->setTypeLocal($data[36]);
                $valeurFonciere->setRegion($regionMapping[strval($data[18])]);
                $manager->persist($valeurFonciere);

                $numberItems++;

                
                if ($numberItems % 10000 == 0)  {
                    echo("Nombre d'éléments enregistrés : " . $numberItems . "\n");
                    $manager->flush();
                    $manager->clear();
                    // Arrêter la boucle après avoir enregistré les 10000 premières lignes
                    //break;
                }

                
            }

            $numberLine++;
        }

     
        $manager->flush();
        $manager->clear();
        fclose($fp);


        }

        
    }
   
}
