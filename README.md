# api-config

## Project doc
```
仅仅提供一些api封装思路
在shared/api中，建立你所需要的业务api模块
```
## Project use
```
封装思路基于多个业务模块
现在在shared/api中有account用户模块，里面封装了一个具有user角色API的类，同属于该模块的可继续扩展
在user类中也可以继续衍生其他模块，例如导出模块，可在该文件下查看
在后端愿意支持下，可再对请求data再次进行封装，该class类将会得到更好的支持，这次不做扩展，有需要可以私下找我探讨
```