<img src="https://user-images.githubusercontent.com/1423657/200393618-3a88e968-44e4-4701-ad14-5a9fd8b427b7.png" width=160>

# boscaiolog
> Harvest Logs in the Forest... I mean Frontend

Simply add a script to enable your console.log statements (or custom loggers) to send to any QRYN endpoint you have.
Making life easier in the process. See the blogpost [here](https://blog.qryn.dev/client-logs-from-anywhere)

## How to use it

Simply import via CDN 

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/metrico/boscaiolog@main/boscaiolog.js"></script>
```
```html
<script type="text/javascript>
 window.bosco.init({
    endpoint: "https://qryn.endpoint.com",
    logFunction: function(log_content) {
        console.info(log_content) // don't do console.log or you'll create an infinite recursion
        this.send(log_content)
    }, 
    idFunction: uuidv4,
    consoleOverwrite: true,
    intervalEnabled: false,
    intervalFn: function () {
        let data = gatherData()
        window.bosco.send(data, [id])
    }
  })
</script>
```

### Option Object

**endpoint** => https url to your qryn endpoint

**logFunction** => overwrite the default log function with your custom log api, to send data to qryn, simply call the 
    .send() function of the bosco object
    
**idFunction** => A function that returns an identifier for this page visit, per default this is a simple UUIDv4 generator

**consoleOverwrite** => Set to true, if your want console.log to overwritten with the default or customer 
    logFunction(recommended if you use console.log in your client-side application)
    
**intervalEnabled** => Set to true to execute the intervalFn each IntervalTime
**intervalFn** => The function to execute each intervalTime, simply call window.bosco.send() inside to send data
**intervalTime** => Time in ms at which the intervalFn should be executed. Required to be at least 800 ms

### Function

**window.bosco.send(data[, IndexId])**

=> Send data that can be JSON.stringified

=> IndexId is an id in addition to your session identifier, it can be used to identify a specific process or part of the client application. (Low Cardinality Recommended)
