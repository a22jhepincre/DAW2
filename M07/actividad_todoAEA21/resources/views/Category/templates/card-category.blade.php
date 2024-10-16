<a href="javascript:;" class="card col-lg-3 col-12 me-lg-4 me-2 text-decoration-none p-0" style="height: 400px; width: 350px;" id="card-category-{{$category->id}}">
    <div class="card-header bg-white d-flex justify-content-between">
        <h4 class="card-title m-0 w-50" id="category-name-{{$category->id}}">
            {{$category->name}}
        </h4>
        <form id="delete-category-form-{{$category->id}}" method="POST" action="{{ route('category.delete', ['id' => $category->id]) }}" class="d-none">
            @csrf
            @method('DELETE')
        </form>
        <div>
            <button class="btn gradient-custom-2 btn-sm btn-add-note" data-id-category="{{$category->id}}">
                <i class="bi bi-plus text-white"></i>
            </button>
            <button class="btn gradient-custom-2 btn-sm btn-edit-category"
                    data-id-category="{{$category->id}}"
                    data-name-category="{{$category->name}}">
                <i class="bi bi-pencil-square text-white"></i>
            </button>
            <button class="btn gradient-custom-2 btn-sm btn-delete-category"
                    data-id-category="{{$category->id}}">
                <i class="bi bi-trash text-white"></i>
            </button>
        </div>

    </div>
    <div class="card-body" style="height: calc(100% - 56px); overflow-y: auto;">
        @forelse($category->notes as $note)
            <div class="card mb-2" id="note-{{$note->id}}">
                <div class="card-body d-flex justify-content-between">
                    <div>
                        <p class="fs-6 fw-bold m-0">{{$note->title}}</p>
                        <p class="fs-8 m-0">{{$note->description}}</p>
                    </div>

                    <div>
                        <button class="btn btn-sm btn-secondary btn-edit-note"
                                data-id-category="{{$category->id}}"
                                data-id-note="{{$note->id}}"
                                data-title-note="{{$note->title}}"
                                data-description-note="{{$note->description}}"
                        ><i class="bi bi-pencil-square"></i></button>

                        <form id="delete-note-form-{{$note->id}}" method="POST" action="{{ route('note.delete', ['id' => $note->id]) }}" class="d-none">
                            @csrf
                            @method('DELETE')
                        </form>
                        <button class="btn btn-sm btn-danger btn-delete-note"
                                data-id-category="{{$category->id}}"
                                data-id-note="{{$note->id}}"
                        ><i class="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        @empty
            <div class="card-body d-flex justify-content-center align-items-center">
                <p>No hay notas registradas.</p>
            </div>
        @endforelse
    </div>
</a>
