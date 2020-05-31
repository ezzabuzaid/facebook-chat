export class IRequestOptions {
    /**
     * Weather if the request should prefixed the request url with the default
     */
    DEFAULT_URL = true;
    /**
     * Weather to show response message in a snackbar
     */
    SNACKBAR = true;
    /**
     * Indicates if the progress bar should be shown for the request latency
     */
    PROGRESS_BAR = true;
    /**
     * Special progress to show when using form container
     * 
     * FYI, the progress bae will be shown in all form container in the same view although the another form didn't ask to
     */
    FORM_PROGRESS_BAR = true;
    /**
     * Returns the whole resoponse
     * 
     * the default is to return only the data property from the reponse
     */
    FULL_RESPONSE = false;
    /**
     * Enable saving the request response in web storage
     */
    LOCAL_CACHE = false;
    /**
     * Name of the object store that will be used to save the response
     * @requires LOCAL_CACHE to be true
     */
    CACHE_CATEGORY = 'local_cache';
}
