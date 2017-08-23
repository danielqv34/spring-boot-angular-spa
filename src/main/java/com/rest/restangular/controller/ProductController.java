package com.rest.restangular.controller;

import com.rest.restangular.entities.Product;
import com.rest.restangular.services.ProductService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/22/2017
 * Time: 2:25 PM
 */
@RestController
public class ProductController {

    private final Log LOG = LogFactory.getLog(ProductController.class);

    @Autowired
    private ProductService productService;

    private static String UPLOADED_FOLDER = "C:\\Users\\daniel quiroz\\Desktop\\restangular\\upload files\\";


    @GetMapping("/getAllProdutcs")
    private ResponseEntity<List<Product>> getProductList() {
        List<Product> productList = productService.listAllProducts();
        if (productList.isEmpty()) {
            LOG.info("La lista esta vacia");
            return new ResponseEntity<List<Product>>(productList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<List<Product>>(productList, HttpStatus.OK);
        }
    }

    @PostMapping("/saveProduct")
    public ResponseEntity<Void> saveProduct(@ModelAttribute Product product, UriComponentsBuilder builder) {
        HttpHeaders httpHeaders = new HttpHeaders();
        if (productService.productExists(product)){
            LOG.info("El producto "+product.getProductName()+" Ya existe");
            httpHeaders.set("status", "CONFLICT");
            httpHeaders.set("code", "409");
            httpHeaders.set("message", "Ya existe el producto que trata de insertar");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        else {
            productService.saveProduct(product);
            LOG.info("Producto Insertado");
            httpHeaders.set("status", "success");
            httpHeaders.set("code", "200");
            httpHeaders.set("message", "Producto Guardado");
            httpHeaders.setLocation(builder.path("/product/{id}").buildAndExpand(product.getId()).toUri());
            return new ResponseEntity<Void>(HttpStatus.CREATED);

        }
    }

    @DeleteMapping("/deleteProduct/{id}")
    public void deleteProduct(@PathVariable(name = "id") Long id) {
        if (!id.equals(null)) {
            productService.deleteProdutc(id);
            LOG.info("Producto Borrado");
        }
    }

    @GetMapping("/getProductById/{id}")
    public ResponseEntity<Product> getRestaurantById(@PathVariable(name = "id") long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            LOG.info("No existe este auto");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            LOG.info(product.getId());
            return new ResponseEntity<>(product, HttpStatus.OK);
        }

    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") long id, @ModelAttribute Product product){
        Product productUpdate = productService.getProductById(id);

        if (productUpdate == null){
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        }else {
            productUpdate.setCode(product.getCode());
            productUpdate.setProductName(product.getProductName());
            productUpdate.setDescription(product.getDescription());
            productUpdate.setPrice(product.getPrice());
            productUpdate.setImage(product.getImage());
            productService.saveProduct(productUpdate);
            return new ResponseEntity<Product>(productUpdate,HttpStatus.OK);
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<Void> uploadImage(@RequestParam("image")MultipartFile file , RedirectAttributes redirectAttributes){

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("message", "Please select a file to upload");
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            redirectAttributes.addFlashAttribute("message",
                    "Archivo Cargado Correctamente '" + file.getOriginalFilename() + "'");
            LOG.info("Archivo Cargado Correctamente");
            return new ResponseEntity<Void>(HttpStatus.ACCEPTED);

        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

    }

}
