//ServeHTTP takes your http.HandlerFunc and runs it through the shim.
func ServeHTTP(h http.HandlerFunc) {
	stdin, err := ioutil.ReadAll(os.Stdin)
	if err != nil {
		log.Fatal(err)
	}

	var request httpRequest
	err = json.Unmarshal(stdin, &request)
	if err != nil {
		log.Fatal(err)
	}

	r, err := http.NewRequest(request.Method, request.URL, bytes.NewBufferString(request.Body))

	if err != nil {
		log.Fatal(err)
	}

	for k, v := range request.Header {
		r.Header.Add(k, v)
	}

	r.RemoteAddr = request.RemoteAddr

	if r.URL.Path == "" {
		r.URL.Path = "/"
	}

	w := httptest.NewRecorder()

	h(w, r)

	resp := w.Result()

	header := make(map[string]string)
	for k, v := range resp.Header {
		header[k] = strings.Join(v, ",")
	}
	response := httpResponse{
		Body:       w.Body.String(),
		Header:     header,
		StatusCode: resp.StatusCode,
	}

	out, err := json.Marshal(&response)
	if err != nil {
		log.Fatal(err)
	}

	os.Stdout.Write(out)
}