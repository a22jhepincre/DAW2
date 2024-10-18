<div>
    esto es el pdf
    @forelse($categories as $category)
        <div>
            {{$category->name}}
        </div>
    @empty
        <div>No hay categorias</div>
    @endforelse
</div>
