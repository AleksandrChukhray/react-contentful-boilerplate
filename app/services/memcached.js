import SHA1 from 'sha1';
import MemJS from 'memjs';

/**
 * @class Service for working with memcached
 */

export default class MemCached {
  constructor (serversStr, options) {
    if (process.env.MEMCACHE_ENABLE === 'true') {
      this.client = MemJS.Client.create(serversStr, options);
    }
  }

  /**
   * Fetches data from the cache, using the given key. If there is data in the cache
   * with the given key, then that data is returned. If there is no such data in the
   * cache, the callback will be passed. The return value of the callback will be
   * written to the cache under the given cache key.
   *
   * @param {String} key
   * @param {Promise} callback
   * @param {Number} expiration
   *
   * @return {Promise} Promise
   */
  fetch (key, expiration, callback) {
    return this.read(key).then(value => {
      if (value) return value;

      return Promise.resolve(callback()).then(val => {
        this.write(key, val, expiration);
        return val;
      });
    });
  }

  /**
   * Writes data to the cache, using the given key.
   *
   * @param {String} key
   *
   * @return {Promise} Promise
   */
  write (key, value, expiration) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        this.client.set(key, this.serialize(value), (error, response) => {
          if (error) reject(error);
          else resolve(response);
        }, expiration);
      } else {
        resolve(true);
      }
    });
  }

  /**
   * Reads data from the cache, using the given key. If there is data in the cache
   * with the given key, then that data is returned, else NUll is returned.
   *
   * @param {String} key
   *
   * @return {Promise} Promise
   */
  read (key) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        this.client.get(key, (error, response) => {
          if (error) reject(error);
          else resolve(this.deserialize(response));
        });
      } else {
        resolve(null);
      }
    });
  }

  /**
  * Deletes data from the cache, using the given key.
  *
  * @param {String} key
  *
  * @return {Boolean} boolean
  */
  delete (key) {
    return new Promise((resolve, reject) => {
      if (this.client) {
        this.client.delete(key, (error, response) => {
          if (error) reject(error);
          else resolve(response);
        });
      } else {
        resolve(true);
      }
    });
  }

  /**
   * Flushes all cache entries.
   *
   * @return {Boolean} boolean
   */
  flush () {
    return new Promise((resolve, reject) => {
      if (this.client) {
        this.client.flush((error, response) => {
          if (error) reject(error);
          else resolve(response);
        });
      } else {
        resolve({});
      }
    });
  }

  deserialize (value) {
    return value ? JSON.parse(value.toString()) : null;
  }

  serialize (value) {
    return value ? JSON.stringify(value) : null;
  }

  keyFor (value) {
    return SHA1(JSON.stringify(value)).toString();
  }
}
