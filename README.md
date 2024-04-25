Projeyi kolanladıktan sonra, eğer vscode kullanıyorsanız gerekli extensionların yüklü olduğuna emin olunuz. 
Visual Studio kullanıyorsanız herhangi bir extansiona veya nugget paketine ihtiyaç yoktur.
Vscode'da dotnet run komutunu çalıştırarak sunucuyu ayağa kaldırabilirsiniz.
API   ASP .Net API kullanarak hazırlanmıştır. 
Ancak sunucuyla vakit kaybetmek istemiyorsanız json.server paketini projenize npm install json-server komutu ile entegre edebilirsiniz.
Sunucunuzu json-server --watch <sizin db.json dosyanız> şeklinde izleyebilirsiniz.
Bu durumda fetch isteklerini gözden geçirerek url'i düzenlemeniz gerekmektedir. 
Projede örnek bir db.json dosyası bulunmaktadır.
