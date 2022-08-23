/**********************************
 * THIS CODE IS IN Old JQuery, i use beaucause my Wordpress using
 * Author : Cébanne Michel
 **********************************/


jQuery(".wpcf7-response-output").css("display", 'none');
jQuery("#calcul").click(function(){
   //init table
   jQuery('.echeance').children().remove();

   var email = jQuery("input[name=email]").val();
   var tel = jQuery("input[name=phone]").val();
   /**
    * Check : Email or tel is required
    */
   if (!email || !tel) {
      alert("Veuillez saisir votre email ou numéro téléphone svp!");
   } else {
      var mtn = jQuery("input[name=numberMontant]").val();
      var duree = jQuery('input[name=numberDuree]').val();
      /**
       * check Montant and duree is required
       */
      if ( mtn =='' || duree == '') {
         alert('Veuillez saisir le montant souhaité et la durée');
      } else {

         var checkInteret = jQuery('select[name=typePret] option:selected').val();
         var interet = 0;
         /**
          * check Interet bay typePrest
          */
         if (checkInteret == "Crédit d'urgence-Social"){
               interet = 5;
         } else if(checkInteret == "Prêt ordinaire" || checkInteret == "Paysan" || checkInteret == "Fonds de roulement" || checkInteret == "Equipement") {
               interet = 3;
         } else {
               interet = 2;
         }
         //Format montant
         var montant = jQuery("input[name=numberMontant]").val().replace(/ /g,'');

         var montantDem = parseFloat(montant); //Parse Float Montant

         var nbEcheance = duree;
         var taux = interet/100;


         /***************** FORMULE FOR OTHER TYPE PRET *********
          *  var tauxAn = interet * nbEcheance / 100;
          *  var Tper = tauxAn/nbEcheance;
          *  var MontantEcheance = montantDem * Tper * ((1+Tper)**nbEcheance) / (((1+Tper)**nbEcheance)-1);
          *  var res = MontantEcheance.toFixed(2).toLocaleString().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
          *  jQuery("#resultR").html(res +" MGA");
         *********************************************************/
         //SHOW MONTANT SOUHAITE AND DUREE
         jQuery("#mtShow").html("Montant souhaité : " + jQuery("input[name=numberMontant]").val() +" MGA");
         jQuery("#mtDuree").html("Durée de remboursement: " + jQuery('input[name=numberDuree]').val() +'mois');
         var cRD = montantDem;
         var MontantInt = montantDem * taux * (32/30);

         for (i=1; i<= nbEcheance; i++){
            jQuery('.echeance').append(
                "<tr>" +
                  "<td>"+i+" </td>" +
                  "<td>"+ ((montantDem/nbEcheance) + MontantInt ).toFixed(2).toLocaleString().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")+" </td>" +
                "</tr>");
            cRD = cRD - (montantDem/nbEcheance);
            MontantInt = cRD * taux * (32/30);

         }

         //Submit Form FOR Wordpress to send email in admin
         jQuery('.xxxsubmit').click();

      }
   }
});

/***********************
 * Check NUMBER IN INPUT MONTANT
 ***********************/
jQuery("input[name=numberMontant]").on("keyup",function (event) {
   var x = jQuery(this).val(jQuery(this).val().replace(/[^0-9\.|\,]/g,''));
   if(event.which == 44)
   {
      return true;
   }
   if ((event.which != 46 || jQuery(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57  )) {
      jQuery(this).val(jQuery(this).val().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 "));
      event.preventDefault();
   }
});