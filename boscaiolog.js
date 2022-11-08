window.bosco = {
    identifier: "default",
    v: "0.1.0",
    label: "weblogs",
    endpoint: "https://qryn.endpoint.com",
    log: async function (log_content) {
        console.info(log_content) // don't do console.log or you'll create an infinite recursion
        this.send(log_content)
    },
    init: function (options) {
        this.endpoint = options?.endpoint || this.endpoint
        this.log = options?.logFunction || this.log
        this.getId = options?.idFunction || this.getId
        this.label = options?.label || this.label

        this.identifier = this.getId()

        if(options.consoleOverwrite) {
            console.log = this.log
        }

        if(options.intervalEnabled && options.intervalFn && options.intervalTime > 800) {
            setInterval(options.intervalFn, options.intervalTime)
        }
    },
    getId: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          })
    },
    send: async function (log_content, indexed_id) {
        let object = {
            id: this.identifier,
            log: log_content
        }

        if (!indexed_id) {
            var res = await fetch(this.endpoint + "/" + this.label + '/_doc/', {
                method: "POST",
                body: JSON.stringify(log_content)
            }).catch((err)=>{
                console.error(err)
            })
        } else {
            var res = await fetch(this.endpoint + "/" + this.label + '/_doc/' + indexed_id, {
                method: "PUT",
                body: JSON.stringify(log_content)
            }).catch((err)=>{
                console.error(err)
            })
        }
    }
}