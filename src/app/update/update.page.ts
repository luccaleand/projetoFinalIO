import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../servico/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  titulo = "update";
  imagem = 'https://cdn.pixabay.com/photo/2016/03/26/16/44/tomatoes-1280859_640.jpg';
  nameButton = 'atualizar';

  /* atributo que guarda os dados do formulario */
  form!: FormGroup;

  /* Guarda o ID */
  routerId = null;

  /*Recebe os dados do banco de dados  */
  product = {};

  constructor(

    /* Ferramenta de criação do formulario */
    private formBuilder: FormBuilder,

    /* Nosso servço de banco de dados */
    /* private bancoDados: DatabaseService */

    /* Serviço do firebase criado por nos */
    private firebaseService: FirebaseService,

    /* ferramenta para capturar o id */
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit() {


    /* Instancia do método validaForm */
    this.validaForm('');

    /* Captura o ID da rota */
    this.routerId = this.activeRouter.snapshot.params['id'];

    /* Caso exista o ID pega ele no banco de dados */
    if (this.routerId) {
      this.firebaseService.consultinha(this.routerId).subscribe(box => this.validaForm(box));
    }



    /*     // Inicializa o ID da rota
        this.validaForm(); */
  }
  validaForm(dados: any) {
    this.form = this.formBuilder.group({
      item: [dados.item, [Validators.required, Validators.minLength(3)]],
      quant: [dados.quant, [Validators.required, Validators.maxLength(10)]]
    });
  }

  updateButton() {
    this.firebaseService.edicao(this.form.value, this.routerId)
  }
}


/* 
  
  1 - Criar página de formulário - ok
  2 - preparar o update para receber um id - altera a rota
  3 - Captura o id passado na rota (activeRouter)
  4 - Consulta ao bando de dados - ok
  5 - passr os dados para o formulário

  */