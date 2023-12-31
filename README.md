# M2_IWOCS_FULLSTACK_LAB

## Membres  
- [x] **Membre 1** : El arbi RIKAB
- [x] **Membre 2** : ABAAKIL Abderrahman
- [x] **Membre 3** : Id Abdeslem Ilyass
- [x] **Membre 4** : El Mehdi KHADDOR


## Description pour lancer la partie backend 

 **Supprimer la base de données existante :**
 
    ```bash
    docker compose exec php bin/console doctrine:database:drop --force
    ```


**Créer une nouvelle base de données :**

    ```bash
    docker compose exec php bin/console doctrine:database:create
    ```

**Mettre à jour le schéma de la base de données :**

    ```bash
    docker compose exec php bin/console doctrine:schema:update --force
    ```

 **Charger les fixtures: **

    ```bash
    docker compose exec php bin/console doctrine:fixtures:load --no-debug
    ```