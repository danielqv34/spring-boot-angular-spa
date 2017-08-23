package com.rest.restangular.repositories;

import com.rest.restangular.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/22/2017
 * Time: 2:28 PM
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Serializable> {
    Product findById(long id);

    Product findByCode(String code);

    Product findByProductName (String productName);
}
