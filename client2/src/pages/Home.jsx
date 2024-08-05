export const Home = () => {

            const addPost = (e) => {
                        e.preventDefault()
                    console.log(e.target.name)
            }

            return (
                        <>
                                    <form onSubmit={addPost}>
                                                <input type="text" name="title" placeholder="write something here" />
                                                <input type="number" name="num" placeholder="Type number here" />
                                                <button type="submit">Submit</button>
                                    </form>
                        </>
            )
}
