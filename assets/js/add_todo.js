{
    let addTodo=function(){
        const todoForm=$('#add_todo_form');
        console.log(todoForm);
        todoForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/create-todo',
                data:todoForm.serialize(),
                success:function(data){
                    let newTodo=newTodoDOM(data.data.todo);
                    $('.todo-list-container').prepend(newTodo);
                },error:function(err){
                    console.log("Error occured",err);
                }

            })
        });
    }
    let newTodoDOM=function(todo){
        return $(`
                
                <li class="single-todo">
                    <div class="check">
                        <input type="checkbox" id="check" name="check" value="${todo._id}">
                        
                        <div class="desc_and_date">
                            <b><span>${todo.description}</span></b>
                            <span class="date">
                                <i class="fas fa-calendar-day"></i>
                            ${todo.date}
                            </span>
                        </div>
                    </div>
                    
                    <div id="category">
                        <span>${todo.category}</span>
                    </div>
                </li>
                
        `)
    }
    addTodo();
}