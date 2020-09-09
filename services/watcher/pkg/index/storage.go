package index

type Storage interface {
	// get index from given store
	Get() (Watch, error)
	// update index
	Update(*Watch) error
	Create(*Watch) error
}