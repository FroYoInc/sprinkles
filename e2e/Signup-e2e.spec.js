describe('Selenium Test Case', function() {
  it('should execute test case without errors', function() {
    var text, value, bool, source, url, title;
    var TestVars = {};
    browser.get("http://localhost:3000/");
    element(by.id("inputEmail")).sendKeys("JoSmo@Froyo.com");
    element(by.xpath("//div/div[3]/div/div[2]/div/form/div[2]/div/input")).sendKeys("Jo");
    element(by.id("inputLName")).sendKeys("Smo");
    element(by.xpath("//div/div[3]/div/div[2]/div/form/div[4]/div/button")).click();
    element(by.id("userName")).sendKeys("JoSmo");
    element(by.id("userPass1")).sendKeys("test");
    element(by.id("userPass2")).sendKeys("test");
    element(by.xpath("//div[@class='jumbotron']//button[.='Sign up']")).click();
  });
});
