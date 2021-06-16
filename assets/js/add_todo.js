{
    let addTodo=function(){
        const todoForm=$('#add_todo_form');

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

            e.target.elements.desc.value='';
            e.target.elements.desc.focus();
            e.target.elements.cat.value='Choose';
            e.target.elements.due_data.value='dd-mm-yyyy';
            
        });
    }
    let newTodoDOM=function(todo){
        return $(`
                
                <li class="single-todo" id="todo-${todo._id}">
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
    let deleteTodo=function(){
        const deleteForm=$('#delete-todo-form');
        deleteForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/delete-todo',
                data:deleteForm.serialize(),
                success:function(data){
                    if(typeof data.data.todoId== "string")
                    {
                        $(`#todo-${data.data.todoId}`).remove();
                    }
                    else
                    {
                        for(key of data.data.todoId){
                            $(`#todo-${key}`).remove();
                        }
                    }
                },error:function(err){
                    console.log("Error");
                }
            })
        })
    }
    deleteTodo();
    addTodo();
}