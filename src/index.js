import { Promise } from 'es6-promise';
import 'isomorphic-fetch';


export class InventoryService {

    constructor(inventoryServiceDomain) {
        this._inventoryServiceDomain = inventoryServiceDomain;
    }

    getWebshopInfo(host) {
        return new Promise(
            (resolve, reject) => {
                const options = {
                    method: 'GET',
                    headers: {
			'Host': host
		    },
                    mode: 'cors',
                    cache: 'no-cache',
                    redirect: 'error',
                    referrer: 'client'
                };

                fetch(`http://${this._inventoryServiceDomain}/webshop`, options)
                    .then((response) => {
                       if (response.ok) {
                           response.json()
                               .then((json) => {
                                   resolve(json.webshopInfo);
                               })
                               .catch((error) => {
                                   reject(error);
                               });
                       } else {
			   reject(response.status);
                       }
                   })
                   .catch((error) => {
                       reject(error);
                   });
            }
        );
    }
}
