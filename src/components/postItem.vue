<template>
  <div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-image">
          <img class="img-responsive" src="https://www.chinatouradvisors.com/images/nopic_s.jpg">
          <span class="card-title">Post</span>
        </div>

        <div class="card-content">
          <p>Detail</p>
        </div>

        <div class="card-action">
          <a style="color: blueviolet" href="#" target="new_blank"><i class="fa fa-user-circle" aria-hidden="true"></i>
              user</a>

          <a class="pull-right" href="#" target="new_blank"><i class="fa fa-pencil" aria-hidden="true"></i>
              edit</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style>
  .card {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .card {
    margin-top: 10px;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: #fff;
  }
  .card span.card-title {
    color: #222;
    font-size: 24px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .card .card-image {
    position: relative;
    overflow: hidden;
  }
  .card .card-image img {
    border-radius: 2px 2px 0 0;
    background-clip: padding-box;
    position: relative;
    z-index: -1;
  }
  .card .card-image span.card-title {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 16px;
  }
  .card .card-content {
    padding: 16px;
    border-radius: 0 0 2px 2px;
    background-clip: padding-box;
    box-sizing: border-box;
  }
  .card .card-content p {
    margin: 0;
    color: inherit;
  }
  .card .card-content span.card-title {
    line-height: 48px;
  }
  .card .card-action {
    border-top: 1px solid rgba(160, 160, 160, 0.2);
    padding: 16px;
  }
  .card .card-action a {
    color: #ffab40;
    margin-right: 16px;
    transition: color 0.3s ease;
    text-transform: uppercase;
  }
  .card .card-action a:hover {
    color: #ffd8a6;
    text-decoration: none;
  }
</style>
