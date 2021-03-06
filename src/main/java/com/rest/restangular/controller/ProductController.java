package com.rest.restangular.controller;

import com.rest.restangular.entities.Product;
import com.rest.restangular.services.ProductService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;
import javax.servlet.ServletContext;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: Daniel Quiroz
 * Date: 8/22/2017
 * Time: 2:25 PM
 */
@RestController
@RequestMapping("/products")
public class ProductController {

    private final Log LOG = LogFactory.getLog(ProductController.class);

    @Autowired
    private ProductService productService;

    @Autowired
    ServletContext servletContext;


    private String imageName = "";

    private static String UPLOADED_FOLDER = "C:\\Users\\daniel quiroz\\IdeaProjects\\spring-boot-angular-spa\\src\\main\\resources\\static\\";


    @GetMapping("/getAllProducts")
    private ResponseEntity<List<Product>> getProductList() {
        List<Product> productList = productService.listAllProducts();
        LOG.info("RUTA SERVER CONEXT PATH "+servletContext.getContextPath());
        LOG.info("RUTA SERVER REAL PATH "+servletContext.getRealPath(""));
        if (productList.isEmpty()) {
            LOG.info("La lista esta vacia");
            return new ResponseEntity<List<Product>>(productList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<List<Product>>(productList, HttpStatus.OK);
        }
    }

    @PostMapping("/saveProduct")
    public ResponseEntity<Void> saveProduct(@RequestBody Product product, UriComponentsBuilder builder) {
        HttpHeaders httpHeaders = new HttpHeaders();
        if (productService.productExists(product)) {
            LOG.info("El producto " + product.getProductName() + " Ya existe");
            httpHeaders.set("status", "CONFLICT");
            httpHeaders.set("code", "409");
            httpHeaders.set("message", "Ya existe el producto que trata de insertar");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        } else {
            product.setImage(imageName);
            productService.saveProduct(product);
            LOG.info("Producto Insertado " + product.toString());
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
    public ResponseEntity<Product> updateProduct(@PathVariable("id") long id, @RequestBody Product product) {
        Product productUpdate = productService.getProductById(id);

        if (productUpdate == null) {
            return new ResponseEntity<Product>(HttpStatus.NOT_FOUND);
        } else {
            productUpdate.setCode(product.getCode());
            productUpdate.setProductName(product.getProductName());
            productUpdate.setDescription(product.getDescription());
            productUpdate.setPrice(product.getPrice());
            productUpdate.setImage(imageName);
            productService.saveProduct(productUpdate);
            return new ResponseEntity<Product>(productUpdate, HttpStatus.OK);
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<?> uploadImage(@RequestParam("file") MultipartFile fileToUplodad) {
        if (fileToUplodad.isEmpty()) {
            return new ResponseEntity("please select a file!", HttpStatus.OK);
        }
        try {
            saveUploadedFiles(Arrays.asList(fileToUplodad));
            imageName = fileToUplodad.getOriginalFilename();
            LOG.info("Successfully uploaded");

        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity("Successfully uploaded - " +
                fileToUplodad.getOriginalFilename(), new HttpHeaders(), HttpStatus.OK);

    }

    //save file
    private void saveUploadedFiles(List<MultipartFile> files) throws IOException {

        for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue; //next pls
            }

            byte[] bytes = file.getBytes();

            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            System.out.println("Ruta: "+path.getParent());
            Files.write(path, bytes);

        }

    }

}
