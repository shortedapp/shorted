package output


import (
	"fmt"

	"github.com/ghodss/yaml"
)

func PrintYAML(jsonbytes []byte) error {

	yamlbytes, err := yaml.JSONToYAML(jsonbytes)

	if err != nil {
		return fmt.Errorf("error converting json to yaml: %v", err)
	}
	
	fmt.Printf("\n%s\n", string(yamlbytes))
	return nil
}