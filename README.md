<h1 align="center"> Playwright-Project </h1>

<div> A Full Framework for testing the Tricentis Demo Web Shop (https://demowebshop.tricentis.com/) <br> 
The objective of this project is to practice what I learned throughout a Playwright course.
</div>

<br>

<details>
  <summary><h2>Table of Contents</h2></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#installation">Installation</a> </li>
    <li><a href="#test-files">Test Files</a></li>
    <li><a href="#running-test-files">Running Test Files</a></li>
    <li><a href="#tools-and-technologies">Tools and Technologies</a></li>
    <li><a href="#configuration-files">Configuration Files</a></li>
  </ol>
</details>

## About The Project
This project tests the main functionalities of the Tricentis Demo Web Shop, such as registering, logging in, adding items to the cart, and checking out.

## Installation
```
npx playwright install
```

## Test Files
This project has four test files, each with several test cases that test a different functionality.
<ul>
  <li>Register.spec.js</li>
  <ul>
    <li>Test Valid Register</li>
    <li>Test Invalid Register</li>
  </ul>
  <br>
  
  <li>Login.spec.js</li>
  <ul>
    <li>Test Valid Login</li>
    <li>Test Invalid Password Login</li>
    <li>Test Invalid Email Login</li>
  </ul>
  <br>
  
  <li>Cart.spec.js</li>
  <ul>
    <li>Test Add Product to Cart</li>
    <li>Test Discount Code</li>
    <li>Test Terms of service</li>
    <li>Test Billing Address</li>
  </ul>
  <br>
  
  <li>EndtoEnd.spec.js</li>
  <ul>
    <li>Test End to End</li>
  </ul>
</ul>  

## Running Test Files
```
npx playwright test tests/Register.spec.js
```
```
npx playwright test tests/Login.spec.js
```
```
npx playwright test tests/Cart.spec.js
```
```
npx playwright test tests/EndtoEnd.spec.js
```

## Tools and Technologies
<ul>
  <li>Playwright Framework</li>
  <li>JavaScript</li>
  <li>JSON</li>
  <li>Page Object Model</li>

</ul>

## Configuration Files
This project includes three configuration files, each of which runs on a different browser with specific requirements.
<ul>
  <li>playwright.config.js</li>
  <ul>
    <li>Run tests on Chrome</li>
    <li>Run tests consequetively</li>
  </ul>
  <br>
  
  <li>playwright.config1.js</li>
  <ul>
    <li>Run tests on Egde</li>
    <li>Generate screenshots on failure</li>
    <li>Run 3 tests parallelly</li>
    <li>2 Retries in case of test failure </li>
  </ul>
  <br>
  
  <li>playwright.config2.js</li>
  <ul>
    <li>Run tests on Safari in headless mode</li>
    <li>Generate videos on failure</li>
    <li>Run tests consequetively</li>
    <li>Emulate mobile</li>
    <li>Record test trace</li>
  </ul>
  <br>  
</ul>

When using the run test files commands mentioned above, they normally use playwright.config.js as the config file; however, you can specify a different config file with this command:
```
npx playwright test tests/Register.spec.js --config playwright.config2.js
```
