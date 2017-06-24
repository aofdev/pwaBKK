<template>
  <div>

    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h1 class="panel-title text-center" style="font-size: 2em"><b>Create Post</b></h1>
          </div>
          <div class="panel-body">
            <form class="form-horizontal">
              <fieldset>
                <div class="form-group">
                  <label for="inputPost" class="col-lg-2 control-label">ชื่อโฟส</label>
                  <div class="col-lg-10">
                    <input type="text" class="form-control" id="inputPost" placeholder="ชื่อโฟส">
                  </div>
                </div>
                <div class="form-group">
                  <label for="textarea" class="col-lg-2 control-label">รายละเอียด</label>
                  <div class="col-lg-10">
                    <textarea type="password" class="form-control" id="textarea" placeholder="รายละเอียด"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-lg-10 col-lg-offset-2">
                    <button type="submit" class="btn btn-warning">บันทึก</button>
                    <button type="reset" class="btn btn-default">Clear</button>

                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>

  </div>
</template>

<script>

</script>

<style>

</style>
