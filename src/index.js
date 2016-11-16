import { Promise } from 'es6-promise';
import 'isomorphic-fetch';


export class InventoryService {

    constructor(inventoryServiceDomain) {
        this._inventoryServiceDomain = inventoryServiceDomain;
    }

    getOrg(accessToken) {
        return this._fetch(
            'GET', `http://${this._inventoryServiceDomain}/org`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.org);
    }

    createOrg(accessToken, name, description, keywords, address, openingHours, imageSet) {
        const orgCreationRequest = {
            name: name,
            description: description,
            keywords: [],
            address: address,
            openingHours: openingHours,
            imageSet: imageSet
        };
        
        return this._fetchWithData(
            'POST', `http://${this._inventoryServiceDomain}/org`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.org, orgCreationRequest);
    }

    getRestaurant(accessToken) {
        return this._fetch(
            'GET', `http://${this._inventoryServiceDomain}/org/restaurant`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.restaurant);
    }

    updateRestaurant(accessToken, name, description, address) {
        const restaurantUpdateRequest = {
            name: name,
            description: description,
            keywords: [],
            address: address
        };

        return this._fetchWithData(
            'PUT', `http://${this._inventoryServiceDomain}/org/restaurant`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.restaurant, restaurantUpdateRequest);
    }

    createMenuSection(accessToken, name, description) {
        const menuSectionCreationRequest = {
            name: name,
            description: description
        };

        return this._fetchWithData(
            'POST', `http://${this._inventoryServiceDomain}/org/menu/sections`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuSections[0], menuSectionCreationRequest);
    }

    getAllMenuSections(accessToken) {
        return this._fetch(
            'GET', `http://${this._inventoryServiceDomain}/org/menu/sections`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuSections);
    }

    getMenuSection(accessToken, sectionId) {
        return this._fetch(
            'GET', `http://${this._inventoryServiceDomain}/org/menu/sections/${sectionId}`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuSection);
    }

    updateMenuSection(accessToken, sectionId, name, description) {
        const menuSectionUpdateRequest = {
            name: name,
            description: description
        };

        return this._fetchWithData(
            'PUT', `http://${this._inventoryServiceDomain}/org/menu/sections/${sectionId}`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuSection, menuSectionUpdateRequest);
    }

    deleteMenuSection(accessToken, sectionId) {
        return this._fetch(
            'DELETE', `http://${this._inventoryServiceDomain}/org/menu/sections/${sectionId}`,
            {'Authorization': `Bearer ${accessToken}`}, (unused) => { return {}; });
    }

    createMenuItem(accessToken, sectionId, name, description, keywords, ingredients, imageSet) {
        const menuItemCreationRequest = {
            sectionId: sectionId,
            name: name,
            description: description,
            keywords: keywords,
            ingredients: ingredients,
            imageSet: imageSet
        };

        return this._fetchWithData(
            'POST', `http://${this._inventoryServiceDomain}/org/menu/items`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuItems[0], menuItemCreationRequest);
    }

    getAllMenuItems(accessToken) {
        return this._fetch(
            'GET', `http://${this._inventoryServiceDomain}/org/menu/items`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuItems);
    }

    getMenuItem(accessToken, itemId) {
        return this._fetch(
            'GET', `http://${this._inventoryServiceDomain}/org/menu/items/${itemId}`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuItem);
    }

    updateMenuItemGeneral(accessToken, itemId, name, description, keywords, ingredients) {
        const menuItemUpdateRequest = {
            name: name,
            description: description,
            keywords: keywords,
            ingredients: ingredients
        };

        return this._fetchWithData(
            'PUT', `http://${this._inventoryServiceDomain}/org/menu/items/${itemId}`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuItem, menuItemUpdateRequest);
    }

    updateMenuItemImageSet(accessToken, itemId, imageSet) {
        const menuItemUpdateRequest = {
            imageSet: imageSet
        };

        return this._fetchWithData(
            'PUT', `http://${this._inventoryServiceDomain}/org/menu/items/${itemId}`,
            {'Authorization': `Bearer ${accessToken}`}, (json) => json.menuItem, menuItemUpdateRequest);
    }

    deleteMenuItem(accessToken, itemId) {
        return this._fetch(
            'DELETE', `http://${this._inventoryServiceDomain}/org/menu/items/${itemId}`,
            {'Authorization': `Bearer ${accessToken}`}, (unused) => { return {}; });
    }
        
    getWebshopInfo(host) {
        return this._fetch(
            'GET', `http://${this._inventoryServiceDomain}/webshop`,
            {'Host': host}, (json) => json.webshopInfo);
    }

    _fetchWithData(method, url, headers, extract, data) {
        const options = {
            method: method,
            headers: headers,
            body: JSON.stringify(data),
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'error',
            referrer: 'client'
        };

        return this._commonFetch(url, options, extract);
    }

    _fetch(method, url, headers, extract) {
        const options = {
            method: method,
            headers: headers,
            mode: 'cors',
            cache: 'no-cache',
            redirect: 'error',
            referrer: 'client'
        };

        return this._commonFetch(url, options, extract);
    }

    _commonFetch(url, options, extract) {
        return new Promise(
            (resolve, reject) => {
                fetch(url, options)
                    .then((response) => {
                        if (response.ok) {
                            response.json()
                                .then((json) => {
                                    resolve(extract(json));
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
